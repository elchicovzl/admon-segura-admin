import { create } from 'zustand';
import axios from "axios";

type SheetAffiliateStore = {
    isOpen: boolean,
    userId: String,
    setUserId: (id:String) => void,
    setIsOpen: () => void,
    data: null,
    loading:boolean,
    execute: (userId:String) => Promise<void>
}

export const useSheetAffiliateStore = create<SheetAffiliateStore>((set) => ({
    userId: "",
    loading: false,
    isOpen: false,
    setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),

    setUserId: (id) => () => {
        set({  isOpen: true,  userId: id,  });
    },

    data: null,

    execute: async (userId) => {
        set({loading:true});
        try {
            const res = await axios.get(`/api/affiliates/${userId}`);
            set({  loading: false, data: res.data });
        } catch (err) {
            
        }
    }
}));