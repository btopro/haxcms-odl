const ImaginaryMixin = (base) =>
  class Imaginary extends base {
    constructor() {
      super();
    }

    imaginaryGenerateUrl(image, operation = 'resize', options = []) {
      const optionsString = options.join('&');
      return `${globalThis.__env.IMAGINARY_URL}/${operation}?url=${
        globalThis.__env.IMAGINARY_HOST_URL
      }/${image}&${optionsString}`;
    }
  };

export { ImaginaryMixin };
