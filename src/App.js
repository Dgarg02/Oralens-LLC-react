import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation for smooth form entry
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f6fc, #e8efff);
  font-family: "Poppins", sans-serif;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6b73ff;
    box-shadow: 0 0 8px rgba(107, 115, 255, 0.5);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6b73ff;
    box-shadow: 0 0 8px rgba(107, 115, 255, 0.5);
    outline: none;
  }
`;

const FileInputWrapper = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
`;

const FileLabel = styled.label`
  padding: 12px;
  width: 100%;
  text-align: center;
  border: 2px dashed #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #6b73ff;
  }
`;

const FileList = styled.ul`
  margin-top: 10px;
  padding: 0;
  list-style: none;
`;

const FileListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f1f1;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const CrossButton = styled.span`
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e63939;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #6b73ff, #4d5efc);
  color: white;
  padding: 14px;
  margin-top: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a62d6, #3c47e0);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Name: ${name}, Age: ${age}, Files: ${
        files.length ? files.map((f) => f.name).join(", ") : "None"
      }`
    );
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Healthcare Form</Title>
          <Label htmlFor="name">Name:</Label>
          <Input
            id="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="age">Age:</Label>
          <Select
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="" disabled>
              Select your age
            </option>
            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </Select>
          <FileInputWrapper>
            <FileLabel htmlFor="file-input">Click to upload files</FileLabel>
            <Input
              id="file-input"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </FileInputWrapper>
          <FileList>
            {files.map((file, index) => (
              <FileListItem key={index}>
                {file.name}
                <CrossButton onClick={() => handleRemoveFile(index)}>×</CrossButton>
              </FileListItem>
            ))}
          </FileList>
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default App;
