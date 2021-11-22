import React from 'react';
import Button from '@material-ui/core/Button';
import {ngrokUrl } from '../../store/HostUrl';
import { useLocation } from 'react-router-dom';
function ExportCsv() {

  const Location = useLocation();
  const exportCsvFile =()=>{

    console.log("Hello");
    var id = Location.pathname.split("/details/")[1];
    var url = `${ngrokUrl}/api/v1/export_csv?company_id=${id}`;
    var anchor = document.createElement("a");
    anchor.setAttribute("href", url);
  anchor.setAttribute("download", "file.csv");
  anchor.click();


  }

  return (
      <Button variant="contained" onClick={exportCsvFile} style={{width:"240px"}}> Export CSV</Button>
  );
}

export default ExportCsv;