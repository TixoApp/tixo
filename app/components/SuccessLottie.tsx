import React from "react";
import Lottie from "react-lottie";

type SuccessLottieProps = {
  h?: number;
  w?: number;
};

const SuccessLottie = ({ h, w }: SuccessLottieProps) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: LottieJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      speed={0.7}
      height={h ?? 400}
      width={w ?? 300}
    />
  );
};

export default SuccessLottie;

const LottieJSON = {
  nm: "HDFC Success",
  ddd: 0,
  h: 512,
  w: 512,
  meta: { g: "LottieFiles AE 1.0.0" },
  layers: [
    {
      ty: 4,
      nm: "check",
      sr: 1,
      st: 0,
      op: 240,
      ip: 0,
      hd: false,
      ddd: 0,
      bm: 0,
      hasMask: false,
      ao: 0,
      ks: {
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 },
        sk: { a: 0, k: 0 },
        p: { a: 0, k: [256, 256, 0], ix: 2 },
        r: { a: 0, k: 0, ix: 10 },
        sa: { a: 0, k: 0 },
        o: { a: 0, k: 100, ix: 11 },
      },
      ef: [],
      shapes: [
        {
          ty: "gr",
          bm: 0,
          hd: false,
          mn: "ADBE Vector Group",
          nm: "Shape 1",
          ix: 1,
          cix: 2,
          np: 4,
          it: [
            {
              ty: "sh",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Shape - Group",
              nm: "Path 1",
              ix: 1,
              d: 1,
              ks: {
                a: 0,
                k: {
                  c: false,
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                  ],
                  v: [
                    [-82.5, 4.5],
                    [-31, 55],
                    [73, -52.5],
                  ],
                },
                ix: 2,
              },
            },
            {
              ty: "tm",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Filter - Trim",
              nm: "Trim Paths 1",
              ix: 2,
              e: {
                a: 1,
                k: [
                  {
                    o: { x: 1, y: 0.076 },
                    i: { x: 0.667, y: 1 },
                    s: [0],
                    t: 60,
                  },
                  { s: [100], t: 85 },
                ],
                ix: 2,
              },
              o: { a: 0, k: 0, ix: 3 },
              s: { a: 0, k: 0, ix: 1 },
              m: 1,
            },
            {
              ty: "st",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Graphic - Stroke",
              nm: "Stroke 1",
              lc: 2,
              lj: 2,
              ml: 1,
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 30, ix: 5 },
              c: { a: 0, k: [1, 1, 1], ix: 3 },
            },
            {
              ty: "tr",
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              sk: { a: 0, k: 0, ix: 4 },
              p: { a: 0, k: [0, 0], ix: 2 },
              r: { a: 0, k: 0, ix: 6 },
              sa: { a: 0, k: 0, ix: 5 },
              o: { a: 0, k: 100, ix: 7 },
            },
          ],
        },
      ],
      ind: 1,
    },
    {
      ty: 4,
      nm: "Shape Layer 2",
      sr: 1,
      st: 0,
      op: 240,
      ip: 0,
      hd: false,
      ddd: 0,
      bm: 0,
      hasMask: false,
      ao: 0,
      ks: {
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            {
              o: { x: 0.656, y: 0.872 },
              i: { x: 0, y: 0.98 },
              s: [0, 0, 100],
              t: 20,
            },
            { s: [150, 150, 100], t: 60 },
          ],
          ix: 6,
        },
        sk: { a: 0, k: 0 },
        p: { a: 0, k: [256, 257.86, 0], ix: 2 },
        r: { a: 0, k: 0, ix: 10 },
        sa: { a: 0, k: 0 },
        o: { a: 0, k: 100, ix: 11 },
      },
      ef: [],
      shapes: [
        {
          ty: "gr",
          bm: 0,
          hd: false,
          mn: "ADBE Vector Group",
          nm: "Ellipse 1",
          ix: 1,
          cix: 2,
          np: 3,
          it: [
            {
              ty: "el",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Shape - Ellipse",
              nm: "Ellipse Path 1",
              d: 1,
              p: { a: 0, k: [0, 0], ix: 3 },
              s: { a: 0, k: [236, 236], ix: 2 },
            },
            {
              ty: "fl",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Graphic - Fill",
              nm: "Fill 1",
              c: { a: 0, k: [0.9216, 0.9216, 0.9216], ix: 4 },
              r: 1,
              o: { a: 0, k: 50, ix: 5 },
            },
            {
              ty: "tr",
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              sk: { a: 0, k: 0, ix: 4 },
              p: { a: 0, k: [0, -3], ix: 2 },
              r: { a: 0, k: 0, ix: 6 },
              sa: { a: 0, k: 0, ix: 5 },
              o: { a: 0, k: 50, ix: 7 },
            },
          ],
        },
      ],
      ind: 2,
    },
    {
      ty: 4,
      nm: "Shape Layer 1",
      sr: 1,
      st: 0,
      op: 240,
      ip: 0,
      hd: false,
      ddd: 0,
      bm: 0,
      hasMask: false,
      ao: 0,
      ks: {
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            {
              o: { x: 0.477, y: 0.587 },
              i: { x: 0, y: 0.999 },
              s: [0, 0, 100],
              t: 10,
            },
            {
              o: { x: 0.167, y: 0 },
              i: { x: 0.833, y: 1 },
              s: [150, 150, 100],
              t: 50,
            },
            {
              o: { x: 0.167, y: 0 },
              i: { x: 0.833, y: 1 },
              s: [150, 150, 100],
              t: 76,
            },
            { s: [210, 210, 100], t: 123 },
          ],
          ix: 6,
        },
        sk: { a: 0, k: 0 },
        p: { a: 0, k: [256, 257.86, 0], ix: 2 },
        r: { a: 0, k: 0, ix: 10 },
        sa: { a: 0, k: 0 },
        o: {
          a: 1,
          k: [
            {
              o: { x: 0.912, y: 0.073 },
              i: { x: 0.626, y: 0.729 },
              s: [100],
              t: 76,
            },
            { s: [0], t: 119 },
          ],
          ix: 11,
        },
      },
      ef: [],
      shapes: [
        {
          ty: "gr",
          bm: 0,
          hd: false,
          mn: "ADBE Vector Group",
          nm: "Ellipse 1",
          ix: 1,
          cix: 2,
          np: 3,
          it: [
            {
              ty: "el",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Shape - Ellipse",
              nm: "Ellipse Path 1",
              d: 1,
              p: { a: 0, k: [0, 0], ix: 3 },
              s: { a: 0, k: [236, 236], ix: 2 },
            },
            {
              ty: "st",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Graphic - Stroke",
              nm: "Stroke 1",
              lc: 1,
              lj: 1,
              ml: 4,
              o: { a: 0, k: 50, ix: 4 },
              w: { a: 0, k: 2, ix: 5 },
              c: { a: 0, k: [1, 1, 1], ix: 3 },
            },
            {
              ty: "fl",
              bm: 0,
              hd: false,
              mn: "ADBE Vector Graphic - Fill",
              nm: "Fill 1",
              c: { a: 0, k: [0.9608, 0.9608, 0.9608], ix: 4 },
              r: 1,
              o: { a: 0, k: 50, ix: 5 },
            },
            {
              ty: "tr",
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              sk: { a: 0, k: 0, ix: 4 },
              p: { a: 0, k: [0, -3], ix: 2 },
              r: { a: 0, k: 0, ix: 6 },
              sa: { a: 0, k: 0, ix: 5 },
              o: { a: 0, k: 50, ix: 7 },
            },
          ],
        },
      ],
      ind: 3,
    },
  ],
  v: "4.8.0",
  fr: 60,
  op: 130,
  ip: 0,
  assets: [],
};
