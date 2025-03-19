const ProfileSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="72" height="72" fill="url(#pattern0_35_2653)" />
      <defs>
        <pattern
          id="pattern0_35_2653"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_35_2653" transform="scale(0.0138889)" />
        </pattern>
        <image
          id="image0_35_2653"
          width="72"
          height="72"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ProfileSvg;
