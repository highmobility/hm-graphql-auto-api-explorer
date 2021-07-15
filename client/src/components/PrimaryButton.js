import '../styles/PrimaryButton.scss';

export default function PrimaryButton({ children }) {
  return (
    <button className="PrimaryButton">
      {children}
    </button>
  );
}
