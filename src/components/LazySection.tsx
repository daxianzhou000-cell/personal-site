import React, { Suspense, useEffect, useRef, useState } from 'react';

type LazySectionProps = {
  loader: () => Promise<{ default: React.ComponentType }>;
  minHeight?: string;
  rootMargin?: string;
};

export default function LazySection({
  loader,
  minHeight = '50vh',
  rootMargin = '300px 0px',
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || Component) return;

    let mounted = true;
    loader().then((mod) => {
      if (mounted) {
        setComponent(() => mod.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Component, loader, shouldLoad]);

  return (
    <div ref={containerRef} style={{ minHeight }}>
      {Component ? (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
}
