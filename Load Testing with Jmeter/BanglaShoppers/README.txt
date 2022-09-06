Dear, 

I’ve completed performance test on frequently used API for test App. 
Test executed for the below mentioned scenario in https://www.banglashoppers.com

01 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~1.3  And Total Concurrent API requested: 162.
02 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~2.1  And Total Concurrent API requested: 324.
03 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~3.6  And Total Concurrent API requested: 486.
04 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~4.9  And Total Concurrent API requested: 648.
05 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~6.0  And Total Concurrent API requested: 810.
10 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~11  And Total Concurrent API requested: 1620.
12 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~10  And Total Concurrent API requested: 1944.
14 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~13  And Total Concurrent API requested: 2106.
15 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~11  And Total Concurrent API requested: 1944.

While executed 15 concurrent request, found 1944 request got connection timeout and error rate is 1.44%. 

Summary: Server can handle almost concurrent 1 API call with almost zero (0) error rate.

Please find the details report from the attachment and  let me know if you have any further queries.