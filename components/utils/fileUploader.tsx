import { uploadFileToStorage } from "@/app/lib/supabase/storage";
import readXlsxFile, { readSheetNames } from "read-excel-file";

const FileUploader = () => {
  return (
    <input
      type="file"
      onChange={(e: any) => {
        readSheetNames(e.target.files[0]).then((sheetnames) => {
          sheetnames.forEach((packageName) => {
            readXlsxFile(e.target.files[0], {
              sheet: packageName,
            }).then(async (rows) => {
              let distance: any[] = [],
                tan1: any[] = [],
                tan3: any[] = [],
                tan5: any[] = [],
                tan7: any[] = [],
                tan10: any[] = [];
              for (let i = 4; i < 101; i++) {
                distance.push(rows[i][0]);
                tan1.push(rows[i][2]);
                tan3.push(rows[i][3]);
                tan5.push(rows[i][4]);
                tan7.push(rows[i][8]);
                tan10.push(rows[i][12]);
              }
              let pricePackage = {
                distance: distance,
                "1tan": tan1,
                "3tan": tan3,
                "5tan": tan5,
                "7tan": tan7,
                "10tan": tan10,
              };
              const json = JSON.stringify(pricePackage, null, 2);
              const fileName = `price.json`;
              const file = new File([json], fileName, {
                type: "application/json",
              });
              try {
                await uploadFileToStorage(
                  "package_price",
                  `${packageName}/${fileName}`,
                  file,
                );
              } catch (err) {
                console.log(err);
              }
            });
          });
        });
      }}
    />
  );
};

export default FileUploader;
