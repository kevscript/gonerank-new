export function Sidebar() {
  return (
    <div className="w-16 h-full bg-neutral-200 pr-[1px] hidden lg:block">
      <div className="w-full h-full bg-white">
        <div className="flex flex-col w-full h-full justify-between py-4">
          <div className="w-full flex justify-center">
            <div className="size-10 flex justify-center items-center bg-neutral-100">
              <span className="font-black">GR</span>
            </div>
          </div>
          <div className="w-full">Nav</div>
          <div className="w-full flex justify-center">
            <div className="size-10 rounded-full bg-neutral-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
