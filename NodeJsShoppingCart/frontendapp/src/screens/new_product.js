import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import Cookie from "js-cookie";
import $ from "jquery";

function New_Product(props) {
  if (localStorage.getItem("role") == "user") {
    props.history.push("/home");
  }
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");

  //picture upload start

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [previewName, setPreviewName] = useState();
  const [message, setmessage] = useState();
  const [status, setStatus] = useState();

  var image = "" + process.env.PUBLIC_URL + "/dummy.jpg";
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setPreviewName(e.target.files[0].name);

    //   const bodyFormData = new FormData();
    //   bodyFormData.append('image', selectedFile);

    //   Axios.post('/upload', bodyFormData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     })
    //     .then((response) => {
    //         alert("good");
    //     })
    //     .catch((err) => {
    //         alert(selectedFile);
    //     });
  };

  ////picture upload end

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(selectedFile);
    //image upload start
    const bodyFormData = new FormData();
    bodyFormData.append("image", selectedFile);

    Axios.post("http://localhost:3000/upload", bodyFormData, {})
      .then((response) => {
        console.log(response);

        const url = "http://localhost:3000/api/product";

        const product = {
          name: Name,
          category: Category,
          description: Description,
          price: Price,
          picture: response.data.path,
        };
        try {
          Axios.post(url, product)
            .then((res) => {
              setStatus(200);
              setmessage("Product added successfullly");
            })
            .catch((e) => {
              setStatus(400);
              setmessage(e.response.data[0]);
              console.log(e.response.data[0]);
              //handle your errors
            });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    //image upload end
  };

  return (
    <div class="row justify-content-center">
      <form
        onSubmit={submitHandler}
        class="jumbotron col-lg-6 col-md-12 col-sm-12"
      >
        {status == 200 ? (
          <p class="text-center alert alert-success">{message}</p>
        ) : (
          ""
        )}
        {status == 400 ? (
          <p class="text-center alert alert-danger">{message}</p>
        ) : (
          ""
        )}

        <ul class="form">
          <li>
            <h2>Add New Product</h2>
          </li>
          <li class="form-group">
            <label htmlFor="name">Name</label>
            <br />
            <input
              class="form-control"
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="email">Category</label>
            <br />
            <input
              class="form-control"
              type="text"
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <label htmlFor="description">
              Description(write alleast 20 characters){" "}
              <b>{Description.length}</b>{" "}
            </label>
            <br />
            <textarea
              type="text"
              class="form-control"
              rows="5"
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </li>
          <li>
            <label htmlFor="price">Price</label>
            <br />
            <input
              type="number"
              min="1"
              class="form-control"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </li>
          <li>
            <br></br>
            <div class="border ">
              <div class="row col-lg-12 col-md-12 col-sm-12 py-4">
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <label
                        onclick="CheckFile()"
                        class="btn btn-success"
                        name="picture"
                      >
                        Upload..
                        <input
                          onChange={onSelectFile}
                          type="file"
                          class="collapse"
                          name="picture"
                          accept=".png,.jpg,.jpeg,.gif,.tif"
                          onchange="ShowImagePreview(this,document.getElementById('imagePreview'))"
                        ></input>
                      </label>
                    </div>
                    <div class="my-4 col-lg-12 col-md-12 col-sm-12">
                      <button type="submit" class="btn btn-primary">
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
                <div class="text-right offset-lg-2 col-lg-4 col-md-12 col-sm-12">
                  {selectedFile ? (
                    <img
                      id="imagePreview"
                      src={preview}
                      width="100"
                      height="100"
                    ></img>
                  ) : (
                    <img
                      id="imagePreview"
                      src={image}
                      width="100"
                      height="100"
                    ></img>
                  )}
                  <p class="picname">{previewName}</p>
                </div>
              </div>
            </div>
          </li>

          <li></li>
        </ul>
      </form>
    </div>
  );
}
function CheckFile() {
  alert("");
  $("#fileUpload").bind("change", function () {
    //this.files[0].size gets the size of your file.
    $("#picname").html(this.files[0].name);
  });
}

function ShowImagePreview(imageUploader, previewImage) {
  if (imageUploader.files && imageUploader.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(previewImage).attr("src", e.target.result);
    };
    reader.readAsDataURL(imageUploader.files[0]);
  }
}

export default New_Product;
