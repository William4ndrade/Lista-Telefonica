import React from 'react';




const Feedback = (props: {text: string, color: "GREEN" | "RED"}) => {
  return (
        <div style={
            {
                backgroundColor: props.color == "RED" ? "rgb(182, 45, 45)" : "green",
                color: 'white',
                width:"100%",
                height: "20px",
                textAlign: 'center',
                borderRadius: "20px",
                fontSize: "14px",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                
            }

        }> 
            {props.text}
        </div>

  )
}

export default Feedback;