import React from 'react';
import { Typography } from '@material-ui/core';
import { GrGithub } from 'react-icons/gr'
import {IoLogoLinkedin} from 'react-icons/io'

export default function Footer() {

  return (
      <footer>
      <hr/>
      <Typography>
        <div>
        <a href="https://github.com/acuity-flo/cycle"><GrGithub color="#545454"/></a> Cycle Github Repo
        </div>
        
        <div >
          Developed by: {' '}
          <a href="https://github.com/arng0123"><GrGithub color="#545454"/></a> <a href="https://www.linkedin.com/in/arielng/"><IoLogoLinkedin color="#545454"/></a> Ariel Ng | {' '}
          <a href="https://github.com/laurenpitruz"><GrGithub color="#545454"/></a> <a href="https://www.linkedin.com/in/laurenpitruzzello/"><IoLogoLinkedin color="#545454"/></a> Lauren Pitruzzello | {' '}
          <a href="https://github.com/oliviakasmin"><GrGithub color="#545454"/></a> <a href="https://www.linkedin.com/in/olivia-kasmin/"><IoLogoLinkedin color="#545454"/></a>Olivia Kasmin 
        </div>

      </Typography>    
      </footer>
  );
}







