export default {
  name: 'intersection',
  mounted(el: Element, binding: { value: string; }) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries: { isIntersecting: boolean; }[], observer: any) => {
      if (entries[0].isIntersecting) {
        binding.value;
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  }
}