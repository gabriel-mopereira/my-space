type Listener = () => void;

type WindowsActions = {
  bringToFront: (slug: string) => void;
  closeWindow: (slug: string) => void;
  openWindow: (slug: string) => void;
  toggleWindow: (slug: string) => void;
};

type WindowsStore = {
  actions: WindowsActions;
  getIsOpen: (slug: string) => boolean;
  getOpenWindowsSnapshot: () => ReadonlySet<string>;
  getZIndex: (slug: string) => number;
  subscribeIsOpen: (slug: string, listener: Listener) => () => void;
  subscribeOpenWindows: (listener: Listener) => () => void;
  subscribeZIndex: (slug: string, listener: Listener) => () => void;
};

const notify = (listeners: Set<Listener> | undefined) => {
  if (!listeners || listeners.size === 0) {
    return;
  }

  for (const listener of listeners) {
    listener();
  }
};

const addListener = (
  bucket: Map<string, Set<Listener>>,
  slug: string,
  listener: Listener,
) => {
  let listeners = bucket.get(slug);

  if (!listeners) {
    listeners = new Set();
    bucket.set(slug, listeners);
  }

  listeners.add(listener);

  return () => {
    const current = bucket.get(slug);

    if (!current) {
      return;
    }

    current.delete(listener);

    if (current.size === 0) {
      bucket.delete(slug);
    }
  };
};

const createWindowsStore = (
  initialOpen: ReadonlyArray<string>,
): WindowsStore => {
  const open = new Set<string>(initialOpen);
  const zIndexes = new Map<string, number>();
  const isOpenListeners = new Map<string, Set<Listener>>();
  const zIndexListeners = new Map<string, Set<Listener>>();
  const openWindowsListeners = new Set<Listener>();

  let counter = 0;
  let openSnapshot: ReadonlySet<string> = new Set(open);

  for (const slug of initialOpen) {
    counter += 1;
    zIndexes.set(slug, counter);
  }

  const refreshOpenSnapshot = () => {
    openSnapshot = new Set(open);
  };

  const getIsOpen = (slug: string) => open.has(slug);

  const getZIndex = (slug: string) => zIndexes.get(slug) ?? 0;

  const getOpenWindowsSnapshot = () => openSnapshot;

  const openWindow = (slug: string) => {
    if (open.has(slug)) {
      return;
    }

    open.add(slug);
    refreshOpenSnapshot();

    counter += 1;
    zIndexes.set(slug, counter);

    notify(isOpenListeners.get(slug));
    notify(zIndexListeners.get(slug));
    notify(openWindowsListeners);
  };

  const closeWindow = (slug: string) => {
    if (!open.has(slug)) {
      return;
    }

    open.delete(slug);
    refreshOpenSnapshot();

    notify(isOpenListeners.get(slug));
    notify(openWindowsListeners);
  };

  const toggleWindow = (slug: string) => {
    if (open.has(slug)) {
      closeWindow(slug);
    } else {
      openWindow(slug);
    }
  };

  const bringToFront = (slug: string) => {
    if (zIndexes.get(slug) === counter) {
      return;
    }

    counter += 1;
    zIndexes.set(slug, counter);

    notify(zIndexListeners.get(slug));
  };

  const subscribeIsOpen = (slug: string, listener: Listener) =>
    addListener(isOpenListeners, slug, listener);

  const subscribeZIndex = (slug: string, listener: Listener) =>
    addListener(zIndexListeners, slug, listener);

  const subscribeOpenWindows = (listener: Listener) => {
    openWindowsListeners.add(listener);

    return () => {
      openWindowsListeners.delete(listener);
    };
  };

  const actions: WindowsActions = {
    bringToFront,
    closeWindow,
    openWindow,
    toggleWindow,
  };

  return {
    actions,
    getIsOpen,
    getOpenWindowsSnapshot,
    getZIndex,
    subscribeIsOpen,
    subscribeOpenWindows,
    subscribeZIndex,
  };
};

export type { WindowsActions, WindowsStore };
export default createWindowsStore;
