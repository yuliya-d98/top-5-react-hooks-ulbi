import { useEffect, useRef } from "react";

export default function useScroll(parentRef, childRef, callback) {
  const observer = useRef();

  useEffect(() => {
    const options = {
      // объект, который нужно отслеживать; объект со скроллом
      root: parentRef.current,
      rootMargin: "0px",
      // значение, насколько мы должны пересечь элемент:
      // 0 - отработает, когда дочерний элемент только появится в зоне видимости,
      // 1 - когда появится в зоне видимости полностью
      threshold: 0,
    };

    // создаем объект этого обзервера
    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log("intersected");
        callback();
      }
    }, options);

    // указываем, за каким дочерним элементом надо следить
    observer.current.observe(childRef.current);

    return function () {
      observer.current.unobserve(childRef.current);
    };
  }, [callback]);
}
