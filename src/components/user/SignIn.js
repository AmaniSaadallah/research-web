  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful login with user data
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      joinDate: new Date().toISOString(),
      interests: ['Artificial Intelligence', 'NLP', 'Cybersecurity']
    };
    
    // Save user data
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect to user page
    navigate('/user');
  };