const formatDate = (dateString :string) => {
    const date = new Date(dateString);
    
    // Format the date to "Month Day, Year"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  export default formatDate