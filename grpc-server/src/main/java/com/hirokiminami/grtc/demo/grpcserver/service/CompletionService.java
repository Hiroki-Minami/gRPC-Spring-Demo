package com.hirokiminami.grtc.demo.grpcserver.service;

import com.hirokiminami.grpc.demo.completion.CompletionGrpc;
import com.hirokiminami.grpc.demo.completion.Prompt;
import com.hirokiminami.grpc.demo.completion.Response;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.ChatClient;

@GrpcService
public class CompletionService extends CompletionGrpc.CompletionImplBase {
    private final Logger logger = LoggerFactory.getLogger(CompletionService.class);

    private final ChatClient chatClient;
    public CompletionService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public void getCompletion(Prompt request, StreamObserver<Response> responseObserver) {
        logger.info(String.format("Got a prompt: %s", request.getQuery()));
        String answer = chatClient.call(request.getQuery());
        Response completionResponse = Response.newBuilder().setAnswer(answer).build();
        logger.info(String.format("Got a response: %s", completionResponse.getAnswer()));

        responseObserver.onNext(completionResponse);
        responseObserver.onCompleted();
    }
}
