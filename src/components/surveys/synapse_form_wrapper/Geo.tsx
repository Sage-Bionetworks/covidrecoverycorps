import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  shouldRender,
  parseDateString,
  toDateString,
  pad,
} from 'react-jsonschema-form/lib/utils'
import { WidgetProps, FieldProps } from 'react-jsonschema-form'
/*const schema = {
    type: "object",
    required: ["lat", "lon"],
    properties: {
      lat: {type: "number"},
      lon: {type: "number"}
    }
  };
  */
 type MyState = {
     lat: number,
     lon: number,
 }
  // Define a custom component for handling the root position object
  export default class GeoPosition extends React.Component<FieldProps, MyState> {
    constructor(props: FieldProps) {
      super(props);
      this.state = {...props.formData};
    }
  
    onChange(name: keyof MyState) {
      return (event: React.SyntheticEvent) => {
          let propName = name as keyof MyState
          //@ts-ignore
        this.setState({ [propName]: parseFloat(event.target.value)}, () => this.props.onChange(this.state));
      };
    }
  
    render() {
      const {lat, lon} = this.state;
      return (
        <div>
          <input type="number" value={lat} onChange={this.onChange("lat")} />
          <input type="number" value={lon} onChange={this.onChange("lon")} />
        </div>
      );
    }
  }