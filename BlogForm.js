import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import ImagePicker from 'react-native-image-picker'

import CustomInput from './CustomInput'

const blogValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required'),
  post: yup
    .string()
    .min(20, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Blog post is required'),
  photo: yup
    .object()
    .required('Photo is required'),
})

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Blog Screen</Text>

          <Formik
            validationSchema={blogValidationSchema}
            initialValues={{
              title: '',
              post: '',
            }}
            onSubmit={values => console.log(values)}
          >
            {({
              handleSubmit,
              isValid,
              values,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
            }) => (
              <>
                <Field
                  component={CustomInput}
                  name="title"
                  placeholder="Title"
                />
                <Field
                  component={CustomInput}
                  name="post"
                  placeholder="Write post..."
                  multiline
                  numberOfLines={3}
                />

                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    ImagePicker.showImagePicker(
                      { title: 'Select Photo' }, (response) => {
                        if (response.uri) setFieldValue('photo', response)
                        setFieldTouched('photo', true)
                    })
                  }}
                >
                  <Text>Add Image</Text>
                </TouchableOpacity>

                {values.photo &&
                  <Text>{`...${values.photo.fileName.substr(values.photo.fileName.length - 10)}`}</Text>
                }

                {(errors.photo && touched.photo) &&
                  <Text style={{ color: 'red' }}>{errors.photo}</Text>
                }

                <Button 
                  onPress={handleSubmit}
                  title="POST"
                  disabled={!isValid || values.title === ""}
                />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  photoButton: {
    backgroundColor: '#c4e0ff',
    elevation: 3,
    width: '70%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

export default App
