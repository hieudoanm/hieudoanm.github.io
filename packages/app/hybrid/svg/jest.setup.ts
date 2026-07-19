import '@testing-library/jest-dom';

if (!File.prototype.text) {
  File.prototype.text = function () {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(this);
    }) as Promise<string>;
  };
}
