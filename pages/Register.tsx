"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    caracteristica: "",
    isCastrado: false,
    isFelv: false,
    isFiv: false,
    idade: 0,
    nome: "",
    endereco: "",
    tutor: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const apiUrlSaveRegisterCat = process.env.NEXT_PUBLIC_API_SAVE_REGISTER_CAT
      const response = await fetch(`${apiUrlSaveRegisterCat}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.back();
      } else {
        console.error("Erro ao criar usuário:", response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className="row m-1 p-1">
        <h1>Registre seu pet</h1>
        <div className="col-12 img-container">
          <img src="/gato.png" className="img-fluid profile-img" alt="..." />
        </div>
        <div className="col-6 form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          <label htmlFor="floatingInput" className="ms-2">
            Nome
          </label>
        </div>

        <div className="col-6 form-floating">
          <input
            type="number"
            className="form-control"
            id="floatingAge"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            pattern="/^[0-9]*$/"
            placeholder="Idade"
          />
          <label htmlFor="floatingAge" className="ms-2">
            Idade
          </label>
        </div>

        <div className="col-12 mt-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingAddress"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Reside em"
          />
          <label htmlFor="floatingAddress" className="ms-2">
            Reside em
          </label>
        </div>

        <div className="col-12 mt-3 form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingTutor"
            name="tutor"
            value={formData.tutor}
            onChange={handleChange}
            placeholder="Tutor Principal"
          />
          <label htmlFor="floatingTutor" className="ms-2">
            Tutor Principal
          </label>
        </div>

        <div className="col-lg-12 mt-3 form-floating">
          <textarea
            className="form-control"
            id="floatingTutor"
            name="caracteristica"
            value={formData.caracteristica}
            onChange={handleChange}
            placeholder="Descrição"
          />
          <label htmlFor="floatingTutor" className="ms-2">
            Decrição
          </label>
        </div>

        <div className="row ms-1 mt-3">
          <div className="col-md-3 form-check ">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheckFiv"
              name="isFiv"
              value={formData.isFiv ? "true" : "false"}
              onChange={handleChange}
              placeholder="Fiv"
            />
            <label className="form-check-label" htmlFor="gridCheckFiv">
              Fiv
            </label>
          </div>
          <div className="col-md-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheckFelv"
              name="isFelv"
              value={formData.isFelv ? "true" : "false"}
              onChange={handleChange}
              placeholder="Felv"
            />
            <label className="form-check-label" htmlFor="gridCheckFelv">
              Felv
            </label>
          </div>
          <div className="col-md-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheckCastrated"
              name="isCastrado"
              value={formData.isCastrado ? "true" : "false"}
              onChange={handleChange}
              placeholder="Castrado"
            />
            <label className="form-check-label" htmlFor="gridCheckCastrated">
              Castrado
            </label>
          </div>
        </div>

        <div className="col-md-12 mb-5 mt-4">
          <button type="submit" className={"btn"}>
            Adicionar Perfil
          </button>
        </div>
      </div>
    </form>
  );
}
export default Register;
