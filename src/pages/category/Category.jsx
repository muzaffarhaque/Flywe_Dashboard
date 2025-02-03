import React, { useEffect, useState } from "react";
import { commonAllAuthApi, commonDeleteAuthApi, commonGetAuthApi } from "../../server/Api";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { isOk } from "../../utils/reusablefunctions";
import Loader from "../../components/Loader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Category() {
    const [aLlCategory, setALlCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        CategoryName: "",
        CategoryDescription: "",
        ParentCategory: ""
    });
    const {CategoryName,CategoryDescription,ParentCategory}=formData;

    const getALlCategory = async () => {
        setLoading(true);
;
        try {
            const res = await commonGetAuthApi("/v1/SubCategory/all/Subcategory");
            if (isOk(res.status)) {
                setALlCategory(res.data.data);
            } else {
                toast.error(res?.response?.data?.message || "Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getALlCategory();
    }, []);

    async function deleteHandler(id) {
        const res = await commonDeleteAuthApi(`/v1/admin/Category/deleteCategory/${selectedCategory}`);
        if (isOk(res.status)) {
            toast.success("Successfully Deleted.");
            setShowModal(false)
            getALlCategory();
        } else {
            toast.error(res?.response?.data?.message || "Something went wrong!");
        }
    }

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleAddCategory = async () => {
      if(!CategoryName){toast.warn("Enter category Name..");return ''}
      const formdata1 = new FormData();
      formdata1.append("name", CategoryName);
        try {
            const res = await commonAllAuthApi("/v1/admin/Category/addCategory", formdata1,'post');
            if (isOk(res.status)) {
                toast.success("Category added successfully.");
                setFormData({ CategoryName: "", CategoryDescription: "", ParentCategory: "" });
                getALlCategory();
            } else {
                toast.error(res?.response?.data?.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error("An error occurred while adding the category.");
        }
    };
    const handleEditClick = (category) => {
      setSelectedCategory(category._id);
      setFormData({
          CategoryName: category?.name || '',
      });
      setEditMode(true);
  };
  const handleEditCategory = async () => {
    if (!selectedCategory) return toast.error("No category selected for editing.");
    const formdata2 = new FormData();
    formdata2.append("name", CategoryName);
    try {
        const res = await commonAllAuthApi(`/v1/admin/Category/updateCategory/${selectedCategory}`, formdata2,'put');
        if (isOk(res.status)) {
            toast.success("Category updated successfully.");
            setFormData({ CategoryName: "", CategoryDescription: "", ParentCategory: "" });
            setEditMode(false);
            setSelectedCategory(null);
            getALlCategory();
        } else {
            toast.error(res?.response?.data?.message || "Something went wrong!");
        }
    } catch (error) {
        toast.error("An error occurred while updating the category.");
    }
};

    return (
        <div className="category-main-wrapper">
            <div className="table-header">
                <h2>Category Management</h2>
                <p>Create, edit, and organize categories to structure products and services in the app. Use sub-categories for more specific organization.</p>
            </div>
            {loading ? (<Loader classes="table-loader" />) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Category Name</th>
                            <th>Sub Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aLlCategory.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" className="cheked-box" /></td>
                                <td>
                                    <div className="user-name-wraper">
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
                                                item?.subCategory.map((ele, i) => (
                                                    <Dropdown.Item key={i}>{ele?.name}</Dropdown.Item>
                                                ))
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
                                            <Dropdown.Item className="edit" onClick={() => handleEditClick(item.category)}>Edit</Dropdown.Item>
                                             <Dropdown.Item onClick={() => { setSelectedCategory(item?.category?._id); setShowModal(true); }} className="delete">Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="btn-wrapper">
                <button className="primary-btn" onClick={()=>{}}>Add SUb-Category</button>
            </div>
            <div className="add-category-wrapper">
                <h1>Add New Category</h1>
                <div className="form-group">
                    <label htmlFor="CategoryName">Category Name</label>
                    <input type="text" name="CategoryName" id="CategoryName" required value={formData.CategoryName} onChange={(e) => handleChange("CategoryName", e.target.value)} placeholder="Enter the name of the new category." />
                </div>
                <div className="form-group">
                    <label htmlFor="CategoryDescription">Category Description</label>
                    <textarea name="CategoryDescription" id="CategoryDescription" required value={formData.CategoryDescription} onChange={(e) => handleChange("CategoryDescription", e.target.value)} placeholder="Add a brief description of what this category encompasses." />
                </div>
                <div className="parent-sub-category-wrapper">
                    <h3>Parent Category</h3>
                    <p>Select a parent category to create a sub-category.</p>
                    <Dropdown className="custom-dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                            {formData.ParentCategory || "Select Parent Category"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {aLlCategory.length > 0 ? (
                                aLlCategory.map((category, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleChange("ParentCategory", category?.category?.name)}>
                                        {category?.category?.name}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item>Not Found</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="btn-wrapper">
                <button className="primary-btn" onClick={editMode ? handleEditCategory : handleAddCategory}>
                  {editMode ? "Update Category" : "Add Category"}
                </button>

            </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this category?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={deleteHandler}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
