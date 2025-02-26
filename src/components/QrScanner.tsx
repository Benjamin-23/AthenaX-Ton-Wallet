import { QrReader } from "react-qr-reader";

export default function QrScanner() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        onResult={(result, error) => {
          if (result?.getText()) {
            console.log(result.getText());
          }
          if (error) {
            console.error(error);
          }
        }}
        containerStyle={{ width: "100%" }}
      />
    </div>
  );
}
