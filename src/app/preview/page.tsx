"use client"

import Preview from "@/components/preview";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { convertToBase64 } from "@/utils/convert-to-base-64";
import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";

export interface ICTA {
  text: string;
  link: string;
}

export interface IForm {
  title: string;
  description: string;
  mainCTA: ICTA;
  secondaryCTA: ICTA | null;
  image: string;
}

const initialSecondaryCTA = {
  text: "Learn More",
  link: "https://github.com/Permanaa/use-case-live-preview",
}

const defaultValues = {
  title: "Boost your productivity. Start using our app today.",
  description: "Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.",
  mainCTA: {
    text: "Get Started",
    link: "https://github.com/Permanaa"
  },
  secondaryCTA: initialSecondaryCTA,
  image: "https://tailwindui.com/img/component-images/dark-project-app-screenshot.png",
}

export default function Home() {
  const { set, get } = useLocalStorage()

  const { handleSubmit, values, handleChange, setFieldValue, setValues } = useFormik<IForm>({
    initialValues: defaultValues,
    onSubmit: values => {
      set<IForm>("live-preview", values)
    }
  })

  useEffect(() => {
    const initialValues = get<IForm>("live-preview") || defaultValues
    setValues(initialValues)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSecondaryCTA = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    if (!checked) {
      setFieldValue("secondaryCTA", null)
      return
    }
    setFieldValue("secondaryCTA", initialSecondaryCTA)
  }

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files?.length) {
      const base64Image= await convertToBase64(files[0]) as string
      setFieldValue("image", base64Image)
    }
  }

  const resetDefault = () => {
    setValues(defaultValues)
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      <div className="p-4 flex items-center justify-center bg-gray-300 dark:bg-slate-800 overflow-y-auto">
        <form className="w-full max-w-lg flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
              onChange={handleChange}
              value={values.title}
            />
          </div>
  
          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-500 focus:border-main-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
              onChange={handleChange}
              value={values.description}
            ></textarea>
          </div>

          <div>
            <p className="font-medium mb-2">Main CTA</p>
            <div className="border border-slate-500 dark:border-slate-400 rounded-lg p-4">
              <div className="flex gap-4 items-center mb-4">
                <label
                  htmlFor="main-cta-text"
                  className="block text-sm text-gray-900 dark:text-white text-nowrap w-32"
                >
                  CTA Text
                </label>
                <input
                  id="main-cta-text"
                  name="mainCTA.text"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
                  onChange={handleChange}
                  value={values.mainCTA.text}
                />
              </div>
              <div className="flex gap-4 items-center">
                <label
                  htmlFor="main-cta-link"
                  className="block text-sm text-gray-900 dark:text-white text-nowrap w-32"
                >
                  Redirect Link
                </label>
                <input
                  id="main-cta-link"
                  name="mainCTA.link"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
                  placeholder="https://"
                  onChange={handleChange}
                  value={values.mainCTA.link}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                id="secondary-cta"
                type="checkbox"
                checked={!!values.secondaryCTA}
                className="w-4 h-4 text-main-600 bg-gray-100 border-gray-300 rounded focus:ring-main-500 dark:focus:ring-main-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={onChangeSecondaryCTA}
              />
              <label className="font-medium" htmlFor="secondary-cta">Secondary CTA</label>
            </div>
            <div className="border border-slate-500 dark:border-slate-400 rounded-lg p-4">
              <div className="flex gap-4 items-center mb-4">
                <label
                  htmlFor="secondary-cta-text"
                  className="block text-sm text-gray-900 dark:text-white text-nowrap w-32"
                >
                  CTA Text
                </label>
                <input
                  id="secondary-cta-text"
                  name="secondaryCTA.text"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
                  onChange={handleChange}
                  value={values?.secondaryCTA?.text || ""}
                />
              </div>
              <div className="flex gap-4 items-center">
                <label
                  htmlFor="secondary-cta-link"
                  className="block text-gray-900 dark:text-white text-nowrap w-32"
                >
                  Redirect Link
                </label>
                <input
                  id="secondary-cta-link"
                  name="secondaryCTA.link"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-500 focus:border-main-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
                  placeholder="https://"
                  onChange={handleChange}
                  value={values?.secondaryCTA?.link || ""}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="block font-medium leading-6">Image</label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:border focus:ring-1 focus:ring-main-500 focus:border-main-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="image"
              name="image"
              type="file"
              accept=".png, .jpeg, .jpg, .webp"
              onChange={onChangeImage}
            />
          </div>

          <div className="flex gap-4 self-end">
            <button
              type="button"
              className="text-main-400 hover:text-main-300 p-2 rounded-lg w-fit focus:outline-none focus:ring-4 focus:ring-main-300"
              onClick={resetDefault}
            >
              Reset to Default
            </button>
            <button
              type="submit"
              className="bg-gradient-to-br from-main-400 to-main-700 hover:from-main-300 hover:to-main-600 py-2 px-6 focus:outline-none focus:ring-4 focus:ring-main-300 rounded-lg w-fit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center col-span-2 p-4">
        <Preview data={values} />
      </div>
    </main>
  );
}
