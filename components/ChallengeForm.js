// ChallengeForm.js
const ChallengeForm = () => {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      category: '',
      endDate: '',
      prize: '',
      imageFile: null
    });
    const [formErrors, setFormErrors] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState(null);
  
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
  
      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: null
        });
      }
    };
  
    // Handle image upload
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          imageFile: file
        });
  
        // Create a preview URL
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
  
        // Clear error for image if it exists
        if (formErrors.imageFile) {
          setFormErrors({
            ...formErrors,
            imageFile: null
          });
        }
      }
    };
  
    // Validate form
    const validateForm = () => {
      const errors = {};
      
      if (!formData.title.trim()) {
        errors.title = "Title is required";
      } else if (formData.title.length < 5) {
        errors.title = "Title must be at least 5 characters";
      }
      
      if (!formData.description.trim()) {
        errors.description = "Description is required";
      } else if (formData.description.length < 20) {
        errors.description = "Description must be at least 20 characters";
      }
      
      if (!formData.category) {
        errors.category = "Please select a category";
      }
      
      if (!formData.endDate) {
        errors.endDate = "End date is required";
      } else {
        const today = new Date();
        const selectedDate = new Date(formData.endDate);
        
        if (selectedDate <= today) {
          errors.endDate = "End date must be in the future";
        }
      }
      
      if (!formData.prize.trim()) {
        errors.prize = "Prize description is required";
      }
      
      if (!formData.imageFile && !previewImage) {
        errors.imageFile = "Challenge image is required";
      }
      
      return errors;
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validate form
      const errors = validateForm();
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        // Scroll to the first error
        const firstErrorField = document.querySelector('[data-error]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      setSubmitting(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            category: '',
            endDate: '',
            prize: '',
            imageFile: null
          });
          setPreviewImage(null);
          setSuccess(false);
          
          // Redirect to challenges page
          window.location.href = 'challenges.html';
        }, 3000);
      }, 1500);
    };
  
    // Success message component
    const SuccessMessage = () => {
      return (
        <div className="submission-success">
          <div className="success-icon">✓</div>
          <h3>Challenge Created Successfully!</h3>
          <p>Your challenge has been submitted for review. Once approved, it will be published on the challenges page.</p>
          <p className="points-earned">You earned 100 creator points!</p>
        </div>
      );
    };
  
    if (success) {
      return <SuccessMessage />;
    }
  
    return (
      <div className="challenge-form-container">
        <form onSubmit={handleSubmit} className="challenge-form">
          <div className="form-group" data-error={formErrors.title ? true : undefined}>
            <label htmlFor="title">Challenge Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Summer Beach Day Look"
            />
            {formErrors.title && <div className="error-message">{formErrors.title}</div>}
          </div>
          
          <div className="form-group" data-error={formErrors.description ? true : undefined}>
            <label htmlFor="description">Challenge Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what participants should create, what to focus on, and any specific requirements"
              rows="4"
            ></textarea>
            {formErrors.description && <div className="error-message">{formErrors.description}</div>}
          </div>
          
          <div className="form-group" data-error={formErrors.category ? true : undefined}>
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="summer">Summer</option>
              <option value="office">Office</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
            </select>
            {formErrors.category && <div className="error-message">{formErrors.category}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group" data-error={formErrors.endDate ? true : undefined}>
              <label htmlFor="endDate">End Date*</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {formErrors.endDate && <div className="error-message">{formErrors.endDate}</div>}
            </div>
            
            <div className="form-group" data-error={formErrors.prize ? true : undefined}>
              <label htmlFor="prize">Prize Description*</label>
              <input
                type="text"
                id="prize"
                name="prize"
                value={formData.prize}
                onChange={handleInputChange}
                placeholder="e.g., 20% discount coupon + 500 points"
              />
              {formErrors.prize && <div className="error-message">{formErrors.prize}</div>}
            </div>
          </div>
          
          <div className="form-group" data-error={formErrors.imageFile ? true : undefined}>
            <label htmlFor="imageFile">Challenge Image*</label>
            <div className="image-upload-container">
              <div className="image-upload-area">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <div className="upload-prompt">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Click to upload or drag image here</span>
                  <small>PNG, JPG or WEBP (max. 2MB)</small>
                </div>
              </div>
              
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Challenge preview" />
                </div>
              )}
            </div>
            {formErrors.imageFile && <div className="error-message">{formErrors.imageFile}</div>}
          </div>
          
          <div className="form-footer">
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Creating Challenge...' : 'Create Challenge'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  // Render the component
  if (document.getElementById('challenge-form-container')) {
    ReactDOM.render(
      <ChallengeForm />,
      document.getElementById('challenge-form-container')
    );
  }