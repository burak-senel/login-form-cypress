import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardFooter, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"

const initialData = {
    ad: '',
    soyad: '',
    email: '',
    password: '',
}
const errorMesages = {
    ad: 'En az 3 karakter giriniz.',
    soyad: 'En az 3 karakter giriniz.',
    email: 'Geçerli bir email adresi giriniz.',
    password: '8-16 karakter, (min) 1 büyük harf, 1 küçük harf, 1 sembol ve 1 rakam içermelidir.'
}
export default function Register() {
    const [formData, setFormData] = useState(initialData)
    const [errors, setErrors] = useState({
        ad: false,
        soyad: false,
        email: false,
        password: false,
    })
    const [isValid, setIsValid] = useState(false);
    const [id, setId] = useState('')
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    useEffect(() => {
        if (errors.ad == false && errors.soyad == false && errors.email == false && errors.password == false) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [formData])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        if (name == 'ad' || name == 'soyad') {
            if (value.trim().length >= 3) {
                setErrors({ ...errors, [name]: false })
            }
            else {
                setErrors({ ...errors, [name]: true })

            }
        }
        if (name == 'email') {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false })
            }
            else {
                setErrors({ ...errors, [name]: true })

            }
        }
        if (name == 'password') {
            if (regex.test(value)) {
                setErrors({ ...errors, [name]: false })
            }
            else {
                setErrors({ ...errors, [name]: true })

            }
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return
        axios.post("https://reqres.in/api/users", formData).then(response => {
            setId(response.data.id)
            setFormData(initialData)
        }).catch(error => console.warn(error))
    }
    return (

        <>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="ad">
                                Adınız:
                            </Label>
                            <Input
                                id="ad"
                                name="ad"
                                placeholder="Adınızı giriniz:"
                                type="text"
                                onChange={handleChange}
                                value={formData.ad}
                                invalid={errors.ad}
                                data-cy="ad-input"
                            /><FormFeedback>
                                {errorMesages.ad}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="soyad">
                                Soyadınız:
                            </Label>
                            <Input
                                id="soyad"
                                name="soyad"
                                placeholder="Soyadınızı giriniz:"
                                type="text" onChange={handleChange}
                                value={formData.soyad}
                                invalid={errors.soyad}
                                data-cy="soyad-input"

                            /><FormFeedback>
                                {errorMesages.soyad}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                                Email:
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Mail giriniz:"
                                type="email" onChange={handleChange}
                                value={formData.email}
                                invalid={errors.email}
                                data-cy="email-input"

                            /><FormFeedback>
                                {errorMesages.email}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Şifre:
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Şifre giriniz:"
                                type="password" onChange={handleChange}
                                value={formData.password}
                                invalid={errors.password}
                                data-cy="password-input"

                            /><FormFeedback>
                                {errorMesages.password}
                            </FormFeedback>
                        </FormGroup>
                        <Button disabled={!isValid} data-cy="submit-button"
                        >
                            Kayıt Ol
                        </Button>
                    </Form>
                </CardBody>
                <CardFooter data-cy="id">Kayıt id: {id}</CardFooter>
            </Card>
        </>
    )
}