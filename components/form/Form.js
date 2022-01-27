import React from "react";
import './Form.css'
import Modal from "react-modal";
import { useState, useRef } from "react";

export default function Forms() {
  const religion = [
    "Islam",
    "Christianity",
    "Hinduism",
    "Buddhism",
    "Sikhism",
    "Athiest",
    "Other",
  ];

  const languages = ["Javascript", "React", "Node JS", "Python", "C/C++"];

  let form = {
    firstName: "",
    lastName: "",
    CnicIssuance: "",
    email: "",
    ProvinceOrState: "",
    Games: "",
    higherEducation: "",
    dateOfBirth: "",
    desc: "",
    mobile: "",
    cnic: "",
    confirmPassword: "",
    password: "",
    favLang: "",
    gender: "",
    religion: "",
  };

  const errors = {
    firstName: "Please enter first name",
    lastName: "Please enter last name",
    CnicIssuance: "Please enter CNIC issuance",
    email: { status: false, message: "Please enter the email" },
    image: "Please upload an image",
    ProvinceOrState: "Please select province or state",
    Games: "Please select games",
    higherEducation: "Please enter highest education",
    dateOfBirth: "Please enter DOB",
    desc: "Please enter description",
    mobile: { status: false, message: "Please enter mobile" },
    cnic: { status: false, message: "Please enter CNIC" },
    confirmPassword: "Please re-enter your password",
    password: { status: false, message: "Please enter password" },
    favLang: "Please select languages",
    gender: "Please select your gender",
    religion: "Please select your religion",
  };

  // useRef

  // const lastNameref = useRef(null);
  // const CnicIssuanceref = useRef(null);
  // const emailref = useRef(null);
  // const ProvinceOrStateref = useRef(null);
  // const Gamesref = useRef(null);
  // const higherEducationref = useRef(null);
  // const dateOfBirthref = useRef(null);
  // const descref = useRef(null);
  // const mobileref = useRef(null);
  // const cnicref = useRef(null);
  // const passwordref = useRef(null);
  // // const religion = useRef(null);
  // const confirmPasswordref = useRef(null);
  // const favLangref = useRef(null);

  // const genderref = useRef(null);

  // // useref function

  // const submitEditing = (ref) => {
  //   if (ref.key === "Enter") return ref.current?.focus();
  // };

  const [formState, setFormState] = useState(form);
  const [errorState, setErrorState] = useState(errors);
  const [choice, setChoice] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onChangeHandler = (event) => {
    const value = event.target.value;
    //For Password
    if (event.target.name === "password") {
      settingState(event, value);
      settingErrors(event, passwordValidation(value));
    }
    //For Password
    if (event.target.name === "email") {
      settingState(event, value);
      settingErrors(event, emailValidation(value));
    }
    //For CNIC Check
    else if (event.target.name === "cnic") {
      settingState(event, value);
      settingErrors(event, cnicValidation(value));
    }
    //For Mobile Check
    else if (event.target.name === "mobile") {
      settingState(event, value);
      settingErrors(event, mobileValidation(value));
    }
    //For Languages
    else if (event.target.name === "favLang") {
      let temp = formState.favLang;
      if (event.target.checked) {
        temp = temp + " " + event.target.value;
      } else {
        temp = temp.replace(event.target.value, "");
      }
      settingState(event, temp);
    }
    //Default
    else {
      settingState(event, value);
    }
  };

  const settingState = (event, value) => {
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const settingErrors = (event, statusTemp) => {
    const name = event.target.name;
    console.log(statusTemp, "erropr name");
    setErrorState({
      ...errorState,
      [name]: {
        ...errorState[name],
        status: statusTemp,
      },
    });
  };

  const passwordValidation = (value) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value))
      return true;
    else return false;
  };

  const mobileValidation = (value) => {
    if (/^[03]{1}[0-9]{3}-[0-9]{7}$/.test(value)) return true;
    else return false;
  };

  const emailValidation = (value) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
    else return false;
  };

  const cnicValidation = (value) => {
    if (/^[3]{1}[0-4]{4}-[0-9]{7}-[0-9]{1}$/.test(value)) return true;
    else return false;
  };

  const [fileSrc, setFileSrc] = useState(null);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFileSrc(reader.result);
      }
    };
    try {
      reader.readAsDataURL(e.target.files[0]);
    } catch {
      return 0;
    }
  };

  const formSubmitted = () => {
    let forAlert = false;
    if (formState.password !== formState.confirmPassword) {
      return alert("Password Didn't Match");
    }
    for (let obj in formState) {
      if (formState[obj] === "") {
        forAlert = true;
      }
    }
    if (forAlert === true) {
      alert("Fill the form first");
    }
    setChoice(true);

    if (
      forAlert === false &&
      formState.password === formState.confirmPassword
    ) {
      setModalIsOpen(true);
    }
    console.log(formState);
    console.log("error obj", errorState);
  };

  return (
    <div className="Background">
      <form>
        <div className="introAndFile">
          <div className="intro">
            <label>First Name</label> <br />
            <br />
            <input
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={onChangeHandler}
              // onKeyPress={() => submitEditing(lastNameref)}
            />
            <span
              style={
                formState.firstName === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.firstName}
            </span>
            <br />
            <br />
            <br />
            <label>Last Name</label> <br />
            <br />
            <input
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              onChange={onChangeHandler}
              // ref={lastNameref}
              // onKeyPress={() => submitEditing(cnicref)}
            />
            <span
              style={
                formState.lastName === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.lastName}
            </span>
            <br />
            <br />
            <br />
            <label>CNIC</label>
            <br />
            <br />
            <input
              type="text"
              placeholder="XXXXX-XXXXXXX-X"
              name="cnic"
              onChange={onChangeHandler}
              // ref={cnicref}
              // onKeyPress={() => submitEditing(CnicIssuanceref)}
              style={
                errorState.cnic.status === true
                  ? { border: "4px solid green" }
                  : { border: "none" }
              }
            />
            <span
              style={
                formState.cnic === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.cnic.message}
              {console.log(errorState.cnic.message)}
            </span>
            <br />
            <br />
            <br />
            <label>CNIC Issuance Date and Time</label> <br />
            <br />
            <input
              type="datetime-local"
              name="CnicIssuance"
              onChange={onChangeHandler}
              // ref={CnicIssuanceref}
              // onKeyPress={() => submitEditing(mobileref)}
            />
            <span
              style={
                formState.CnicIssuance === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.CnicIssuance}
            </span>
          </div>
          <div className="File">
            <input
              type="file"
              id="fileInput"
              name="image-upload"
              onChange={imageHandler}
              accept="image/*"
            />
            <label
              for="fileInput"
              className="File"
              style={
                fileSrc !== null
                  ? { display: "none", border: "3px solid green" }
                  : { display: "block" }
              }
            >
              Choose a photo
            </label>
            <img
              src={fileSrc}
              alt="UploadedPhoto"
              className="imgSetting"
              width="410px"
              height="320px"
              style={
                fileSrc === null ? { display: "none" } : { display: "block" }
              }
            />
            <label
              for="fileInput"
              className="File"
              width="410px"
              height="320px"
              style={
                fileSrc === null
                  ? { display: "none" }
                  : { display: "block", marginLeft: "335px" }
              }
            >
              Choose any other photo
            </label>
          </div>
        </div>

        {/* Mobile Phone and Email */}
        <br />
        <br />
        <br />
        <div className="MobileAndEmail">
          <br />
          <br />
          <br />
          <div className="mobile">
            <label>Mobile</label>
            <br />
            <br />
            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              onChange={onChangeHandler}
              name="mobile"
              // ref={mobileref}
              // onEnterKey={() => submitEditing(emailref)}
              style={
                errorState.mobile.status === true
                  ? { border: "4px solid green" }
                  : { border: "none" }
              }
            />
            <span
              style={
                formState.mobile === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.mobile.message}
            </span>
          </div>
          <div className="email">
            <label>Email</label>
            <br />
            <br />
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              placeholder="Enter Your Email"
              // ref={emailref}
              // onKeyPress={() => submitEditing(ProvinceOrStateref)}
              style={
                errorState.email.status === true
                  ? { border: "4px solid green" }
                  : { border: "none" }
              }
            />
            <span
              style={
                formState.email === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.email.message}
            </span>
          </div>
        </div>

        {/* Province And Games */}
        <div className="ProvinceAndGames">
          <br />
          <br />
          <br />
          <div className="province">
            <label>Enter Your Province or State</label> <br />
            <br />
            <select
              name="ProvinceOrState"
              onChange={onChangeHandler}
              // ref={ProvinceOrStateref}
              // onKeyPress={() => submitEditing(Gamesref)}
            >
              <option>Select Your Province</option>
              <option value="AJK">AJK</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Balochistan">Balochistan</option>
              <option value="KPK">KPK</option>
              <option value="GilgitBalististan">Gilgit Balististan</option>
            </select>
            <span
              style={
                formState.ProvinceOrState === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.ProvinceOrState}
            </span>
          </div>

          <div className="games">
            <label>Select Your Favorite Games</label> <br />
            <br />
            <select
              name="Games"
              onChange={onChangeHandler}
              // ref={Gamesref}
              // onKeyPress={() => submitEditing(religion)}
            >
              <option>Please Select Game</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Bedminton">Bedminton</option>
              <option value="Table Tenis">Table Tenis</option>
            </select>
            <button type="button">Select</button>
            <span
              style={
                formState.Games === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.Games}
            </span>
          </div>
        </div>

        {/* Religion */}
        <div className="religionDiv">
          <label>Religion:</label> <br />
          <br />
          <div className="religion" onChange={onChangeHandler} name="religion">
            {religion.map((rel) => (
              <div>
                <input
                  type="radio"
                  value={rel}
                  name="religion"
                  // ref={religion}
                  // onKeyPress={() => submitEditing(higherEducationref)}
                />
                <label for={rel}>{rel}</label>
              </div>
            ))}
          </div>
          <span
            style={
              formState.religion === "" && choice === true
                ? { display: "block", marginTop: "10px", color: "red" }
                : { display: "none" }
            }
          >
            {errorState.religion}
          </span>
        </div>

        {/* Qualification And Date Of Birth */}
        <br />
        <br />
        <br />
        <div className="QualAndDOB">
          <br />
          <br />
          <br />
          <div className="highestQual">
            <label>Enter Your Highest Qualification</label> <br />
            <br />
            <input
              type="text"
              onChange={onChangeHandler}
              name="higherEducation"
              placeholder="Highest Qualification"
              // ref={higherEducationref}
              // onKeyPress={() => submitEditing(dateOfBirthref)}
            />
            <span
              style={
                formState.higherEducation === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.higherEducation}
            </span>
          </div>
          <div className="dob">
            <label>Choose Your DOB</label> <br />
            <br />
            <input
              type="text"
              onChange={onChangeHandler}
              name="dateOfBirth"
              placeholder="Enter Your Date Of Birth"
              // ref={dateOfBirthref}
              // onKeyPress={() => submitEditing(favLangref)}
            />
            <span
              style={
                formState.dateOfBirth === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.dateOfBirth}
            </span>
          </div>
        </div>

        {/* Languages */}
        <div className="favLanguages">
          <div>
            <label>Favourite Languages:</label> <br />
            <br />
            <div className="lang" name="favLang" onChange={onChangeHandler}>
              {languages.map((lang) => (
                <div>
                  <input
                    type="checkbox"
                    value={lang}
                    name="favLang"
                    // ref={favLangref}
                    // onKeyPress={() => submitEditing(descref)}
                  />
                  <label for={lang}>{lang}</label>
                </div>
              ))}
            </div>
            <span
              style={
                formState.favLang === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.favLang}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <label for="description">Description</label>
          <br />
          <textarea
            onChange={onChangeHandler}
            name="desc"
            // ref={descref}
            // onKeyPress={() => submitEditing(passwordref)}
          ></textarea>
          <span
            style={
              formState.desc === "" && choice === true
                ? { display: "block", marginTop: "10px", color: "red" }
                : { display: "none" }
            }
          >
            {errorState.desc}
          </span>
        </div>
        {/* Password And Confirm Password */}
        <br />
        <br />
        <br />
        <div className="PasswordAndConfirm">
          <br />
          <br />
          <br />
          <div className="password">
            <label>Password</label>
            <br />
            <br />
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={onChangeHandler}
              name="password"
              // ref={passwordref}
              // onKeyPress={() => submitEditing(confirmPasswordref)}
              style={
                errorState.password.status === true
                  ? { border: "4px solid green" }
                  : { border: "none" }
              }
            />
            <span
              style={
                formState.password === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.password.message}
            </span>
          </div>
          <div className="confirmPassword">
            <label>Confirm Password</label>
            <br />
            <br />
            <input
              type="password"
              placeholder="Confirm Your Password"
              onChange={onChangeHandler}
              name="confirmPassword"
              // ref={confirmPasswordref}
              // onKeyPress={() => submitEditing(genderref)}
              style={
                errorState.password.status === true &&
                formState.password === formState.confirmPassword
                  ? { border: "4px solid green" }
                  : { border: "none" }
              }
            />
            <span
              style={
                formState.confirmPassword === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.confirmPassword}
            </span>
          </div>
        </div>

        {/* Gender */}
        <div className="genderDiv">
          <div className="gender" onChange={onChangeHandler} name="gender">
            <label>Gender:</label> <br />
            <br />
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              // ref={genderref}
            />
            <label for="Male">Male</label>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              // ref={genderref}
            />
            <label for="Female">Female</label>
            <input
              type="radio"
              id="Other"
              name="gender"
              value="Other"
              // ref={genderref}
            />
            <label for="Other">Other</label>
          </div>
          <span
            style={
              formState.gender === "" && choice === true
                ? { display: "block", marginTop: "10px", color: "red" }
                : { display: "none" }
            }
          >
            {errorState.gender}
          </span>
        </div>

        {/* Submit Data */}
        <div className="submitData">
          <button
            type="button"
            className="submit-btn"
            onClick={() => {
              formSubmitted();
            }}
          >
            SUBMIT DATA
          </button>
        </div>

        {/* Modal and Displaying Data*/}
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              position: "fixed",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
              textAlign: "center",
            },
          }}
        >
          <h1>Form Submission</h1>
          <br />
          {
            <div className="display">
              {Object.keys(formState).map(function (keyName, keyIndex) {
                return (
                  <div className="rowData">
                    <div className="keys">
                      {keyName
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .toUpperCase()}
                      :
                    </div>
                    <div className="values">{formState[keyName]}</div>
                  </div>
                );
              })}
            </div>
          }
          <br />
          <br />
          <button onClick={() => setModalIsOpen(false)}>Confirm</button>
        </Modal>
      </form>
    </div>
  );
}
