import React from 'react'
import BackButton from '../shared/BackButton'
import SpacingIcon from '../Icons/SpacingIcon'
import ListTitleInput from './ListTitleInput'

function ItemPageHeader() {
  return(
    <>
      <BackButton />
      <ListTitleInput />
      <SpacingIcon />
    </>
  )
}

export default ItemPageHeader