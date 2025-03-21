const HandSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="72" height="72" fill="url(#pattern0_36_2359)" />
      <defs>
        <pattern
          id="pattern0_36_2359"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_36_2359" transform="scale(0.0138889)" />
        </pattern>
        <image
          id="image0_36_2359"
          width="72"
          height="72"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default HandSvg;
