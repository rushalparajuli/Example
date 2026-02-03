import { useForm } from "react-hook-form";
import { TableHedaer } from "../../components/ui/TableHeader";
import { useAuth } from "../../hooks/auth";
import { BrandEditDTO, type IBrandEditData } from "./brand.contract";
import { FormLabel } from "../../components/form/FormLabel";
import { FileInput, FormInputControl, SelectInput } from "../../components/form/FormInput";
import { FormCancelButton, FormSubmitButton } from "../../components/form/FormAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axiosInstance from "../../config/axios.config";
import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";

export default function BrandEditPage() {
    const { loggedInUser } = useAuth()
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<IBrandEditData>({
        defaultValues: {
            name: "",
            status: "",
            logo: null
        },
        resolver: zodResolver(BrandEditDTO)
    })
    const navigate = useNavigate()
    const submitHandler = async (data: IBrandEditData) => {
        try {
            await axiosInstance.put("/brand/" + params.id, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Banner Edited successfully!")
            navigate(`/${loggedInUser?.role}/brands`)
        } catch {
            toast.error("Banner cannot be edited at this moment. Please try again later!!!")
        }

    }
    const getBrandDetail = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/brand/" + params.id)
            setValue("name", response.data.name)
            setValue("status", response.data.status)
        } catch {
            toast.error("Brand cannot be fetched at this moment. Please try again later!!!")
            navigate(`/${loggedInUser?.role}/brands`)
        } finally {
            setLoading(false)
        }
        // eslint-disable-next-line 
    }, [params])
    useEffect(() => {
        getBrandDetail()
    }, [getBrandDetail])
    return (
        <section className="flex flex-col gap-6">
            <TableHedaer title="Brand Edit Page" showSearch={false} btnTxt="<-Go Back" btnUrl={`/${loggedInUser?.role}/brands`} />
            <div className=" overflow-x-auto rounded-lg shadow bg-gray-200 p-5">
                {
                    loading ? (
                        <>Loading...</>
                    ) : (
                        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-5">
                            <div className="flex">
                                <FormLabel htmlFor="name" >Name:</FormLabel>
                                <div className="w-3/4">
                                    <FormInputControl
                                        control={control}
                                        name="name"
                                        type="text"
                                        placeholder="Enter brand title here..."
                                        errMsg={errors.name?.message}
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <FormLabel htmlFor="status" >Status:</FormLabel>
                                <div className="w-3/4">
                                    <SelectInput
                                        name="status"
                                        control={control}
                                        errMsg={errors.status?.message}
                                        options={[
                                            { label: "Published", value: "active" },
                                            { label: "Unpublished", value: "inactive" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <FormLabel htmlFor="logo" >Logo:</FormLabel>
                                <div className="w-3/4">
                                    <FileInput
                                        name="logo"
                                        control={control}
                                        errMsg={errors.logo?.message} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row w-full  justify-end">
                                <div className="w-3/4 flex gap-3">
                                    <FormCancelButton disabled={isSubmitting} label="Reset" />
                                    <FormSubmitButton disabled={isSubmitting} label="Submit" />
                                </div>
                            </div>

                        </form>
                    )
                }
            </div>

        </section>
    )
}