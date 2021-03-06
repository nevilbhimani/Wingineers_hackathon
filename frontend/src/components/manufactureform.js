import React,{ useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/company.scss";
import { Navigate } from "react-router-dom";
const Manufacturer = ({ email }) => {
  const [data,setData]=useState()
  const items = [
    "ManufacturerName",
    "TotalAnnualRevenue",
    "MainProducts",
    "Employees",
    "YearEstablished",
    "Address",
    "City",
    "State",
    "Pincode",
    "Country",
  ];
  const formik = useFormik({
    initialValues: {
      ManufacturerName: "",
      TotalAnnualRevenue: "",
      MainProducts: "",
      Employees: "",
      YearEstablished: "",
      Address: "",
      City: "",
      State: "",
      Pincode: "",
      Country: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log(values);
      console.log(email);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("company_name", values.ManufacturerName);
      formData.append("main_products", values.MainProducts);
      formData.append("total_annual_revenue", values.TotalAnnualRevenue);
      formData.append("total_employee", values.Employees);
      formData.append("year_esatblished", values.YearEstablished);
      formData.append("address_main", values.Address);
      formData.append("zip_code", values.Pincode);
      formData.append("counrty", values.Country);
      formData.append("state", values.State);
      formData.append("city", values.City);
      fetch("http://127.0.0.1:8000/clients/manufacturer/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json().then((json) =>setData(json)))
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="company">
      <Grid container>
        <Grid item xs={12}>
          <Typography className="company-headings ">
            Manufacturer Registeration
          </Typography>
        </Grid>
        {items.map((item) => (
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography className="company-text ">{item}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <input
                className="styledForm"
                id={item}
                name={item}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.item}
              />
              {formik.touched.item && formik.errors.item ? (
                <p className="error">{formik.errors.item}</p>
              ) : null}
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            className="styledButton"
            onClick={formik.handleSubmit}
          >
            Register
          </Button>
        </Grid>
        {data?<Navigate to='/login' />:<p></p>}
      </Grid>
    </div>
  );
};

export default Manufacturer;
