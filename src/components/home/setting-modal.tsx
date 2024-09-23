"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { LLMNode } from "@/models/llm-node";
import axiosInstance from "@/utils/axios";

interface SettingModalProps {
  period: number;
  setPeriod: (period: number) => void;
  maxScrapeNumber: number;
  setMaxScrapeNumber: (maxScrapeNumber: number) => void;
}

export default function SettingModal({
  period,
  setPeriod,
  maxScrapeNumber,
  setMaxScrapeNumber,
}: SettingModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [llmNodes, setLlmNodes] = useState<LLMNode[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchLlmNodes = async () => {
      const response = await axiosInstance.get("/api/llm-node");
      setLlmNodes(response.data.llmNodes);
    };
    fetchLlmNodes();
  }, []);

  const handleUpdateLLMNodes = async () => {
    await axiosInstance.post(`/api/llm-node`, {
      llmNodes,
    });
    setIsUpdating(false);
    toast.success("更新成功");
  };

  return (
    <>
      <Button onPress={onOpen}>設定介面</Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>設定</h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="抽樣週期"
                  type="number"
                  value={period.toString()}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                />
                <Input
                  label="推文總取得數"
                  type="number"
                  value={maxScrapeNumber.toString()}
                  onChange={(e) => setMaxScrapeNumber(Number(e.target.value))}
                />
                {llmNodes.map((llmNode) => (
                  <Textarea
                    minRows={32}
                    key={llmNode.name}
                    label={llmNode.name}
                    type="text"
                    value={llmNode.prompt}
                    onChange={(e) => {
                      const updatedLLMNode = {
                        ...llmNode,
                        prompt: e.target.value,
                      };
                      setLlmNodes(
                        llmNodes.map((node) =>
                          node.name === updatedLLMNode.name
                            ? updatedLLMNode
                            : node
                        )
                      );
                      setIsUpdating(true);
                    }}
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {isUpdating && (
                  <Button
                    color="primary"
                    variant="light"
                    onPress={handleUpdateLLMNodes}
                  >
                    更新
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
