const Error = () => {
  return (
    <div className="flex items-center justify-center gap-10 h-full">
      <div className="text-[120px] text-sky-500">404</div>
      <div className="">
        <h1 className="text-[24px]">Page not found</h1>
        <div className="text-[19px]">
          <p>We're sorry, we couldn't find the page you requested.</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
