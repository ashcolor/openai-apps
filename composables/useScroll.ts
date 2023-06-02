import { useScroll as useVueUseScroll , UseScrollOptions } from "@vueuse/core";
import type { MaybeRefOrGetter } from "@vueuse/shared";


export function useScroll(
    element: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>,
    options: UseScrollOptions = {}
) {
    const { x, y, isScrolling, arrivedState, directions } = useVueUseScroll(element, options);

    const scrollBottom = () => {
        const clientHeight = element.value?.clientHeight ?? 0;
        const scrollHeight = element.value?.scrollHeight ?? 0;
        y.value = scrollHeight - clientHeight;
    };

    return {
        x,
        y,
        isScrolling,
        arrivedState,
        directions,
        scrollBottom,
    };
}
