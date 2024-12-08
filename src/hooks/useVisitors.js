import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  fetchVisitors,
  addVisitor,
  deleteVisitor,
  fetchVisitor,
  updateVisitor,
} from "../api/visitorsApi";

import { setVisitors, setVisitorsMeta } from "../store/reducers/visitorReducer";

export const useFetchVisitors = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["visitors"],
    queryFn: fetchVisitors,
  });

  useEffect(() => {
    if (query.data) {
      const { data: visitors, meta } = query.data;
      dispatch(setVisitors(visitors));
      dispatch(setVisitorsMeta(meta));
    }
  }, [query.data, dispatch]);

  return query;
};

export const useFetchVisitorById = (id) => {
  return useQuery({
    queryKey: ["visitor", id],
    queryFn: () => fetchVisitor(id),
  });
};

export const useAddVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (visitor) => addVisitor(visitor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });
};

export const useUpdateVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateVisitor(data.id, data.visitor),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", variables.id] });
    },
  });
};

export const useDeleteVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] }); // Refresh visitors list
    },
  });
};
