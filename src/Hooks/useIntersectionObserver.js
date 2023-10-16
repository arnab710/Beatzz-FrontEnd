import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (elementRef, options) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const observer = useRef(null);

	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}
		observer.current = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		const currentElement = elementRef.current;
		if (currentElement) {
			observer.current.observe(currentElement);
		}

		return () => {
			observer.current.disconnect();
		};
	}, [elementRef, options]);

	return isIntersecting;
};

export default useIntersectionObserver;
