import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/popup.js',
  output:
  {
    name: 'covid',
    file: 'public/popup.js',
    format: 'umd',
    plugins: [
      terser()
    ]
  }
};