package com.hirokiminami.grtc.demo.web.service;

import com.hirokiminami.grpc.demo.completion.CompletionGrpc;
import com.hirokiminami.grpc.demo.completion.CompletionGrpc.CompletionBlockingStub;
import com.hirokiminami.grpc.demo.completion.Prompt;
import com.hirokiminami.grpc.demo.completion.Response;
import com.hirokiminami.grtc.demo.web.config.GrpcProperties;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;
import java.util.concurrent.TimeUnit;

@Service
public class CompletionService {
    private final ManagedChannel managedChannel;
    private final CompletionGrpc.CompletionBlockingStub completionBlockingStub;
    public CompletionService(GrpcProperties grpcProperties) {
        ManagedChannelBuilder<?> managedChannelBuilder = ManagedChannelBuilder.forAddress(grpcProperties.host(), grpcProperties.port()).usePlaintext();
        managedChannel = managedChannelBuilder.build();
        this.completionBlockingStub = CompletionGrpc.newBlockingStub(managedChannel);
    }
    @PreDestroy
    public void shutDown() throws InterruptedException {
        managedChannel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    public String getCompletion(String prompt) {
        try {
            final Response completionResponse = completionBlockingStub.getCompletion(Prompt.newBuilder().setQuery(prompt).build());
            return completionResponse.getAnswer();
        } catch (final StatusRuntimeException e) {
            return "FAILED with " + e.getStatus().getCode().name();
        }
    }
}
