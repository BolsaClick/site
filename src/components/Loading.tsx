// Spinner.jsx
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color="#3498db" loading={true} size={40} />
    </div>
  );
};

export default Spinner;
