import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AdminState {
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
  userRole: AppRole | null;
  isLoading: boolean;
}

export function useAdmin(): AdminState {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<AdminState>({
    isAdmin: false,
    isManager: false,
    isStaff: false,
    userRole: null,
    isLoading: true,
  });

  useEffect(() => {
    async function fetchRole() {
      if (authLoading) return;
      
      if (!user) {
        setState({
          isAdmin: false,
          isManager: false,
          isStaff: false,
          userRole: null,
          isLoading: false,
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (error) {
          logger.error("Error fetching user role", error);
          setState({
            isAdmin: false,
            isManager: false,
            isStaff: false,
            userRole: "customer",
            isLoading: false,
          });
          return;
        }

        const role = data?.role as AppRole;
        setState({
          isAdmin: role === "admin",
          isManager: role === "manager",
          isStaff: role === "staff",
          userRole: role,
          isLoading: false,
        });
      } catch (err) {
        logger.error("Error in fetchRole", err);
        setState({
          isAdmin: false,
          isManager: false,
          isStaff: false,
          userRole: null,
          isLoading: false,
        });
      }
    }

    fetchRole();
  }, [user, authLoading]);

  return state;
}
