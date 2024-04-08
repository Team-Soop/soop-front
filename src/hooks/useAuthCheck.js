import { useEffect } from "react";
import { useQueryClient } from "react-query"

export const useAuthCheck = () => {
    const queryClient = useQueryClient();
    
    useEffect(() => {
        const principalData = queryClient.getQueryData("principalQuery");
        console.log("토큰 확인" + principalData);
        if(!principalData) {
            alert("로그인 후 이용 바랍니다.")
            window.location.replace("/auth/signin");
        }
    }, [queryClient]);
}