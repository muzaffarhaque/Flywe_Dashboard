import React, { useEffect, useState } from "react";
import { commonDeleteAuthApi, commonGetAuthApi } from "../../server/Api";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { isOk } from "../../utils/reusablefunctions";

export default function Category() {
  const [aLlCategory, setALlCategory] = useState([]);

  const getALlCategory = async () => {
    const res = await commonGetAuthApi("/v1/SubCategory/all/Subcategory");
    if (isOk(res.status)) {
      setALlCategory(res.data.data);
    } else {
      toast.error(response?.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    getALlCategory();
  }, []);

  async function deleteHandler(id) {
    const res = await commonDeleteAuthApi(
      `/v1/admin/Category/deleteCategory/${id}`
    );
    if (isOk(res.status)) {
      toast.success("Successfully Delete.");
    } else {
      toast.error(res?.response?.data?.message || "Something went wrong!");
    }
  }
  return (
    <div className="category-main-wrapper">
      <div className="table-header">
        <h2>Category Management</h2>
        <p>
          Create, edit, and organize categories to structure products and
          services in the app. Use sub-categories for more specific
          organization.
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="" id="" />
            </th>
            <th>Category Name</th>
            <th>Sub Category</th>
            <th>Status</th>
            <th>React</th>
          </tr>
        </thead>
        <tbody>
          {aLlCategory?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" name="" id="" className="cheked-box" />
                </td>
                <td>
                  <div className="user-name-wraper">
                    {/* <img src={profileImg} alt="" className='profile' /> */}
                    <h6 className="fs-16-13">{item?.category?.name || ""}</h6>
                  </div>
                </td>
                <td>
                  <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                      {item?.subCategory?.length} Sub-Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {item?.subCategory?.length > 0 ? (
                        item?.subCategory?.map((ele, i) => {
                          return <Dropdown.Item>{ele?.name}</Dropdown.Item>;
                        })
                      ) : (
                        <Dropdown.Item>Not Found</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{item?.category?.__v ? "Active" : "In-Active"}</td>
                <td>
                  <Dropdown className="custom-dropdown category-drop">
                    <Dropdown.Toggle id="dropdown-btn">...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div onClick={() => editHanlder()} className="edit">
                        Edit
                      </div>
                      <div
                        onClick={() => deleteHandler(item?.category?._id)}
                        className="delete"
                      >
                        Delete
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
