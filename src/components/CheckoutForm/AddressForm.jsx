import React, {useState} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form';

import {commerce} from '../../lib/commence'

import FormInput from './CustomTextField'

const AddressForm = () => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.commerce.localListShippingCountries(checkoutTokenId);

        setShippingCountries(countries)
    }

    return (
        <div>
            <Typography variant="h6" gutterBottom >Shipping address</Typography>
            <FormProvider { ... methods} >
                <form onSubmit=''>
                    <Grid container spacing={3} >
                        <FormInput required name='firstName' label='First name' />
                        <FormInput required name='lastname' label='Last name' />
                        <FormInput required name='address1' label='Address' />
                        <FormInput required name='emial' label='Email' />
                        <FormInput required name='City' label='City' />
                        <FormInput required name='zip' label='Zip / Postal code' />
                        {/*<Grid item xs={12} sm={6} >
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={} >
                                <MenuItem key={} value={} >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>*/}
                    </Grid>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
