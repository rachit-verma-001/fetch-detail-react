import React from 'react';
import Button from '@material-ui/core/Button';

function ExportCsv() {

  const exportCsvFile =()=>{

    console.log("Hello")
    var url = `http://localhost:4000/api/v1/export_csv?company_name=Protonshub Technologies&url=https://www.linkedin.com/company/protonshub-technologies`;
    var anchor = document.createElement("a");
    anchor.setAttribute("href", url);
  anchor.setAttribute("download", "file.csv");
  anchor.click();


  }

  return (
      <Button variant="outlined" onClick={exportCsvFile} style={{width:"240px"}}> Export </Button>
  );
}

export default ExportCsv;