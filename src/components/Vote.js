const Vote = ({ score }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="rounded-full p-2 border-[0.5px] border-gray-400"
        data-te-toggle="tooltip"
        disabled={true}
        title="This question shows research effort; it is useful and clear"
      >
        <svg
          className="svg-icon iconArrowUp"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M1 12h16L9 4l-8 8Z"></path>
        </svg>
      </button>
      <div className="p-2 text-[19px]">{score}</div>
      <button
        className="rounded-full p-2 border-[0.5px] border-gray-400"
        data-te-toggle="tooltip"
        disabled={true}
        title="This question does not show any research effort; it is unclear or not useful"
      >
        <svg
          className="svg-icon iconArrowDown"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M1 6h16l-8 8-8-8Z"></path>
        </svg>
      </button>

      <button
        className="mt-3 p-2"
        disabled={true}
        data-te-toggle="tooltip"
        title="Save this question."
      >
        <svg
          className="fill-gray-300"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
        </svg>
      </button>

      <button
        className="p-2"
        disabled={true}
        data-te-toggle="tooltip"
        title="Show activity on this post."
      >
        <svg
          className="fill-gray-300"
          width="19"
          height="18"
          viewBox="0 0 19 18"
        >
          <path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Vote;
