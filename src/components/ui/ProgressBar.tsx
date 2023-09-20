type ProgressBarProps = {
  label: string;
  value: number;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { value, label } = props;

  return (
    <>
      <div className="flex justify-between">
        <label>{label}</label>
        <span className="value">{value}%</span>
      </div>
      <div className="h-[9px] rounded-md bg-gray-200 dark:bg-gray-800">
        <div
          className="h-[9px] rounded-md bg-sky-500"
          style={{ width: value + "%", transition: "width .6s" }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
