import React from 'react';
import Button from '@material-ui/core/Button';
import {ngrokUrl } from '../../store/HostUrl';
import { useLocation } from 'react-router-dom';

function ExportCsv() {

  const Location = useLocation();

  const exportCsvFile =()=>{
    console.log("Hello");
    var id = Location.pathname.split("/details/")[1];
    const fcity = localStorage.getItem('fcity')
    const fstate = localStorage.getItem('fstate')
    const fcountry = localStorage.getItem('fcountry')
    const employee_type = localStorage.getItem('fdesignation')
    var url = `${ngrokUrl}/api/v1/search?id=${id}&city=${fcity}&state=${fstate}&country=${fcountry}&employee_types=${employee_type}&isCsv=true`;
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
