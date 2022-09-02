import { useState } from 'react';
import './App.css';
import { Pets } from './ui-components';
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";
import { AddPet } from "./ui-components";
import { PetDetails } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
// import { Storage } from "@aws-amplify/storage";



function App({ user, signOut }) {
  // Save a file to S3 test
  // async function saveFile() {
  //   await Storage.put("test.txt", "Hello");
  // }

  // State
  const [showPets, setShowPets] = useState(true)
  const [showForm, setShowForm] = useState(false)  //the form is false in the beginning
  const [showDetails, setShowDetails] = useState(false) // showDetails is false in the beginning to hide 
  const [pet, setPet] = useState()
  const [updatePet, setUpdatePet] = useState()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [breed, setBreed] = useState("")
  const [about, setAbout] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")

  // Override Add Pet Form
  const formOverride = {
    // Name Field default name
    TextField29766922: {
      placeholder: name
    },
    // Age Field default age
    TextField29766923: {
      placeholder: age
    },
    // Breed Field default breed
    TextField29766924: {
      placeholder: breed
    },
    // About Field default about
    TextField34532687: {
      placeholder: about
    },
    // Color Field default color
    TextField34532694: {
      placeholder: color
    },
    // Image Field default image
    TextField34532701: {
      placeholder: image
    },
    // Image override
    image: {
      src: updatePet == null
        ? "https://images.unsplash.com/photo-1538128835124-7805d3fd3f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0fHx8fHx8MTY1MjczMzE2Mw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        : updatePet.image,
    },
    // Save button
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },
    // Update button
    Button34532716: {
      isDisabled: !updatePet ? true : false //check if update is not null then its gonna be true
    },
    Icon: {
      // Make the mouse a cursor when hover over X
      style: {
        cursor: "pointer"
      },
      // Add Pet Form Hide when you click X on the form
      onClick: () => {
        setShowForm(false);
        setShowPets(true);
      },
    },
  }

  // Override Navbar
  const navBarOverrides = {
    // Signout button
    Button: {
      onClick: signOut,
    },
    // Navbar Icon right Cat
    image: {
      src: user?.attributes.profile
      // src: "https://img.icons8.com/color/50/000000/cat"
    },
    // Add Pet button left
    "Add Pet": {
      // change cursor to hand on hover
      style: {
        cursor: "pointer"
      },
      // Add Pet Button top left
      onClick: () => {
        // saveFile();
        setShowForm(!showForm);
        if (showPets) setShowPets(false)
        else setShowPets(true);
      }
    }
  }

  return (
    <div className="App">

      {/* NavBar */}
      <NavBar width={"100%"} overrides={navBarOverrides} />

      {/* Header */}
      <header className="App-header">

        {/* PetDetails 
          We make sure to pass in this object pet whenever PetDetails are rendered */}
        {showDetails && <PetDetails 
            pet={pet} 
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
            overrides={{
              Close: {
                style: {
                  cursor: "pointer"
                },
                onClick: () => {
                  setShowDetails(false);
                  setShowPets(true);
                },
              }
            }}
        />}

        {/* AddPet */}
        {showForm && (<AddPet 
            pet={updatePet}
            overrides={formOverride}
            style={{
              textAlign: "left",
              margin: "1rem"
            }}
          />
        )}

        {/* Pets */}
        {showPets && <Pets 
          overrideItems={({ item, index }) => ({
            overrides: {
              Breed: {color: "blue"},
              // Profile Button
              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails);
                  // We setPet to item to whatever has been clicked
                  // item which is that pet object
                  setPet(item);
                  setShowPets(false);
                },
              },
              // Update Button
              Button34502688: {
                onClick: () => {
                  if (!showForm) setShowForm(true)
                  setUpdatePet(item)
                  setName(item.name)
                  setAge(item.age)
                  setBreed(item.breed)
                  setAbout(item.about)
                  setColor(item.color)
                  setImage(item.image)
                  setShowPets(false)
                },
              },
            },
          })}
        />}
      </header>

      {/* Footer */}
      <Footer width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);