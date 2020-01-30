import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.mjs",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs"
    },
    {
      file: "dist/cjs/index.min.js",
      format: "cjs",
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: "dist/esm/index.mjs",
      format: "esm"
    },
    {
      file: "dist/esm/index.min.mjs",
      format: "esm",
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [resolve(), sourcemaps(), commonjs(), json()]
};
