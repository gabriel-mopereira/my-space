type Listener = () => void;

type AnimationDirection = "opening" | "closing";

type Rect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type WindowAnimation = {
  direction: AnimationDirection;
  fromRect: Rect;
  targetRect: Rect | null;
};

type WindowsActions = {
  bringToFront: (slug: string) => void;
  closeWindow: (slug: string, shortcutRect?: Rect, windowRect?: Rect) => void;
  completeAnimation: (slug: string) => void;
  openWindow: (slug: string, fromRect?: Rect) => void;
  setAnimationTargetRect: (slug: string, rect: Rect) => void;
  toggleWindow: (slug: string, shortcutRect?: Rect, windowRect?: Rect) => void;
};

type WindowsStore = {
  actions: WindowsActions;
  getAllAnimations: () => ReadonlyMap<string, WindowAnimation>;
  getAnimation: (slug: string) => WindowAnimation | null;
  getIsOpen: (slug: string) => boolean;
  getOpenWindowsSnapshot: () => ReadonlySet<string>;
  getZIndex: (slug: string) => number;
  subscribeAllAnimations: (listener: Listener) => () => void;
  subscribeAnimation: (slug: string, listener: Listener) => () => void;
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

const createWindowsStore = (): WindowsStore => {
  const open = new Set<string>();
  const zIndexes = new Map<string, number>();
  const animations = new Map<string, WindowAnimation>();

  const isOpenListeners = new Map<string, Set<Listener>>();
  const zIndexListeners = new Map<string, Set<Listener>>();
  const animationListeners = new Map<string, Set<Listener>>();
  const openWindowsListeners = new Set<Listener>();
  const allAnimationListeners = new Set<Listener>();

  let counter = 0;
  let openSnapshot: ReadonlySet<string> = new Set(open);
  let animationsSnapshot: ReadonlyMap<string, WindowAnimation> = new Map();

  const refreshOpenSnapshot = () => {
    openSnapshot = new Set(open);
  };

  const refreshAnimationsSnapshot = () => {
    animationsSnapshot = new Map(animations);
  };

  const notifyAnimation = (slug: string) => {
    refreshAnimationsSnapshot();

    notify(animationListeners.get(slug));
    notify(allAnimationListeners);
  };

  const clearAnimation = (slug: string) => {
    if (!animations.has(slug)) {
      return false;
    }

    animations.delete(slug);
    notifyAnimation(slug);

    return true;
  };

  const getIsOpen = (slug: string) => open.has(slug);

  const getZIndex = (slug: string) => zIndexes.get(slug) ?? 0;

  const getOpenWindowsSnapshot = () => openSnapshot;

  const getAnimation = (slug: string) => animations.get(slug) ?? null;

  const getAllAnimations = () => animationsSnapshot;

  const openWindow = (slug: string, fromRect?: Rect) => {
    const isOpen = open.has(slug);

    if (isOpen) {
      if (animations.get(slug)?.direction === "closing") {
        clearAnimation(slug);
      }

      return;
    }

    open.add(slug);
    refreshOpenSnapshot();

    counter += 1;
    zIndexes.set(slug, counter);

    notify(isOpenListeners.get(slug));
    notify(zIndexListeners.get(slug));
    notify(openWindowsListeners);

    if (fromRect) {
      animations.set(slug, {
        direction: "opening",
        fromRect,
        targetRect: null,
      });

      notifyAnimation(slug);
    }
  };

  const closeWindow = (
    slug: string,
    shortcutRect?: Rect,
    windowRect?: Rect,
  ) => {
    if (!open.has(slug)) {
      return;
    }

    if (shortcutRect && windowRect) {
      animations.set(slug, {
        direction: "closing",
        fromRect: windowRect,
        targetRect: shortcutRect,
      });

      notifyAnimation(slug);

      return;
    }

    open.delete(slug);
    refreshOpenSnapshot();

    clearAnimation(slug);

    notify(isOpenListeners.get(slug));
    notify(openWindowsListeners);
  };

  const toggleWindow = (
    slug: string,
    shortcutRect?: Rect,
    windowRect?: Rect,
  ) => {
    if (open.has(slug)) {
      closeWindow(slug, shortcutRect, windowRect);

      return;
    }

    openWindow(slug, shortcutRect);
  };

  const bringToFront = (slug: string) => {
    if (zIndexes.get(slug) === counter) {
      return;
    }

    counter += 1;
    zIndexes.set(slug, counter);

    notify(zIndexListeners.get(slug));
  };

  const setAnimationTargetRect = (slug: string, rect: Rect) => {
    const animation = animations.get(slug);

    if (!animation || animation.direction !== "opening") {
      return;
    }

    animations.set(slug, { ...animation, targetRect: rect });

    notifyAnimation(slug);
  };

  const completeAnimation = (slug: string) => {
    const animation = animations.get(slug);

    if (!animation) {
      return;
    }

    animations.delete(slug);

    if (animation.direction === "closing" && open.has(slug)) {
      open.delete(slug);
      refreshOpenSnapshot();

      notify(isOpenListeners.get(slug));
      notify(openWindowsListeners);
    }

    notifyAnimation(slug);
  };

  const subscribeIsOpen = (slug: string, listener: Listener) =>
    addListener(isOpenListeners, slug, listener);

  const subscribeZIndex = (slug: string, listener: Listener) =>
    addListener(zIndexListeners, slug, listener);

  const subscribeAnimation = (slug: string, listener: Listener) =>
    addListener(animationListeners, slug, listener);

  const subscribeOpenWindows = (listener: Listener) => {
    openWindowsListeners.add(listener);

    return () => {
      openWindowsListeners.delete(listener);
    };
  };

  const subscribeAllAnimations = (listener: Listener) => {
    allAnimationListeners.add(listener);

    return () => {
      allAnimationListeners.delete(listener);
    };
  };

  const actions: WindowsActions = {
    bringToFront,
    closeWindow,
    completeAnimation,
    openWindow,
    setAnimationTargetRect,
    toggleWindow,
  };

  return {
    actions,
    getAllAnimations,
    getAnimation,
    getIsOpen,
    getOpenWindowsSnapshot,
    getZIndex,
    subscribeAllAnimations,
    subscribeAnimation,
    subscribeIsOpen,
    subscribeOpenWindows,
    subscribeZIndex,
  };
};

export type {
  AnimationDirection,
  Rect,
  WindowAnimation,
  WindowsActions,
  WindowsStore,
};
export default createWindowsStore;
