import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import { useState } from "react";

interface IuseCrud<T> {
    dataCRUD: T[];
    fetchData: () => Promise<T[]>;
    error: Error | null;
    isLoading: boolean;
}


const useCrud = <T>(initialData: T[], apiUrl: string): IuseCrud<T> => {
    const jwtAxios = useAxiosWithInterceptor()
    const [dataCRUD, setDataCRUD] = useState<T[]>(initialData)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiUrl}`, {})
            const data = response.data as T[];
            setDataCRUD(data);
            setError(null);
            setIsLoading(false);
            return data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.status == 400) {
                setError(new Error("400"))
            }
            setIsLoading(false);
            throw error;
        }

        // return { fetchData }
    }

    return { dataCRUD, error, fetchData, isLoading }
}

export default useCrud